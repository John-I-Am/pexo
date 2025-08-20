'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconPlus, IconSearch, IconSortAZ } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Group,
  rem,
  SimpleGrid,
  Stack,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { setCookieByKey } from '@/app/api/cookies';
import { createDeck } from '@/app/api/database/decks/mutations';
import { Deck } from '@/app/dashboard/_components/Deck/Deck';
import { Deck as DeckType } from '@/generated/prisma';

interface SortableField {
  title: string;
}

export const DeckList = ({ decks, isPrebuilt }: { decks: DeckType[]; isPrebuilt: boolean }) => {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<any>(decks);
  const [sortBy, setSortBy] = useState<keyof SortableField | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [pending, setPending] = useState<boolean>(false);

  const router = useRouter();

  // This is needed to apply changes on deck deletion
  useEffect(() => {
    setSortedData(sortData(decks, { sortBy, reversed: reverseSortDirection, search }));
  }, [decks]);

  const handleCreate = async () => {
    setPending(true);
    const result: any = await createDeck();
    setCookieByKey('notification', 'Deck Created');
    router.push(`/dashboard/decks/${result.id}`);
  };

  function filterData(data: SortableField[], search: string) {
    const query = search.toLowerCase().trim();
    const fieldsToSearch = ['title'];
    return data.filter((item: any) =>
      fieldsToSearch.some((key) => item[key].toLowerCase().includes(query))
    );
  }

  const sortData = (
    data: DeckType[],
    payload: { sortBy: keyof SortableField | null; reversed: boolean; search: string }
  ) => {
    const { sortBy } = payload;

    if (!sortBy) {
      return filterData(data, payload.search);
    }

    return filterData(
      [...data].sort((a: any, b: any) => {
        if (payload.reversed) {
          return b[sortBy].localeCompare(a[sortBy]);
        }

        return a[sortBy].localeCompare(b[sortBy]);
      }),
      payload.search
    );
  };

  const setSorting = (field: keyof SortableField) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(decks, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(decks, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  return (
    <Stack>
      <Group py="md">
        <Button onClick={handleCreate} leftSection={<IconPlus />} loading={pending}>
          New Deck
        </Button>
        <TextInput
          placeholder="Search by titles"
          size="sm"
          radius="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Tooltip label="Sort by Title">
          <ActionIcon
            onClick={() => setSorting('title')}
            variant="outline"
            aria-label="Sort-alphabetical"
            size="lg"
          >
            <IconSortAZ style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <SimpleGrid cols={{ base: 2, sm: 2, lg: 3, xl: 3 }}>
        {sortedData?.map((d: any) => (
          <Deck
            key={d.id}
            title={d.title}
            description={d.description}
            id={d.id}
            cards={d.cards}
            tags={d.tags}
            isPrebuilt={isPrebuilt ? isPrebuilt : undefined}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};
