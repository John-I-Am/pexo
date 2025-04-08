'use client';

import {
  ActionIcon,
  Button,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  TextInput,
  Tooltip,
  rem,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconPlus, IconSearch, IconSortAZ } from '@tabler/icons-react';
import { Deck as DeckType } from '@prisma/client';
import { useFormStatus } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import classes from './DeckList.module.css';
import { Deck } from '../Deck/Deck';
import { createDeck } from '@/src/app/api/database/decks/mutations';

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

export function DeckList({ decks, editable }: { decks: DeckType[]; editable: boolean }) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<any>(decks);
  const [sortBy, setSortBy] = useState<keyof SortableField | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

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
      <Group wrap="nowrap" className={classes.test}>
        <Button
          component={Link}
          href={`/dashboard/decks/${pathname === '/dashboard/decks' ? '/explore' : '/'}`}
          variant="light"
          radius="md"
        >
          {pathname === '/dashboard/decks' ? 'Explore' : 'My Decks'}
        </Button>
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
              id={d.id}
              cards={d.cards}
              tags={d.tags}
              editable={editable}
            />
          ))}
        </SimpleGrid>
      </ScrollArea>
    </Stack>
  );
}
