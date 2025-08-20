'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconPlus, IconSearch, IconSortAZ } from '@tabler/icons-react';
import { useFormStatus } from 'react-dom';
import {
  ActionIcon,
  Button,
  Group,
  rem,
  ScrollArea,
  SimpleGrid,
  Stack,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { createDeck } from '@/app/api/database/decks/mutations';
import { Deck } from '@/app/dashboard/_components/Deck/Deck';
import { Deck as DeckType } from '@/generated/prisma';

interface SortableField {
  title: string;
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" radius="md" leftSection={<IconPlus />} loading={pending}>
      New Deck
    </Button>
  );
}

export function DeckList({ decks, isPrebuilt }: { decks: DeckType[]; isPrebuilt: boolean }) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<any>(decks);
  const [sortBy, setSortBy] = useState<keyof SortableField | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const router = useRouter();

  const handleCreate = async () => {
    const result: any = await createDeck();
    notifications.show({
      title: 'New Deck Created',
      message: 'Start studying!',
    });

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

  // nextJs cache revalidation broken?, This is a workaround
  useEffect(() => {
    setSortedData(sortData(decks, { sortBy, reversed: reverseSortDirection, search }));
  }, [decks]);

  return (
    <Stack>
      <Group>
        <form action={() => handleCreate()}>
          <FormButton />
        </form>
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
      <ScrollArea>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
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
      </ScrollArea>
    </Stack>
  );
}
