'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Tooltip,
  Button,
  ActionIcon,
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';
import classes from './CardTable.module.css';
import { deleteCard } from '@/app/api/actions/cards';

interface RowData {
  front: string;
  back: string;
  level: string;
  nextReview: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

const formateDate = (date: any) => {
  const currentDate: any = new Date();
  const differenceInMilliseconds: any = date - currentDate;
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

  let formattedTime;

  if (differenceInMinutes < 60) {
    // Less than 1 hour away, display in minutes
    formattedTime = `${Math.ceil(differenceInMinutes)} minutes`;
  } else if (differenceInMinutes < 1440) {
    // Less than 24 hours away, display in hours
    formattedTime = `${Math.ceil(differenceInMinutes / 60)} hours`;
  } else {
    // More than or equal to 24 hours away, display in days
    const differenceInDays = Math.ceil(differenceInMinutes / 1440);
    formattedTime = `${differenceInDays} days`;
  }

  return formattedTime;
};

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group wrap="nowrap" justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  //does not filters by level, and date
  const fieldsToSearch = ['front', 'back'];
  return data.filter((item: any) =>
    fieldsToSearch.some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a: any, b: any) => {
      if (payload.reversed) {
        // Seperate check needed for level since its of type int
        if (sortBy === 'level') {
          return b.level - a.level;
        }
        // Seperate check needed for level since its of type date
        if (sortBy === 'nextReview') {
          return new Date(b.nextReview).getTime() - new Date(a.nextReview).getTime();
        }

        return b[sortBy].localeCompare(a[sortBy]);
      }

      // Seperate check needed for level since its of type int
      if (sortBy === 'level') {
        return a.level - b.level;
      }
      // Seperate check needed for level since its of type date
      if (sortBy === 'nextReview') {
        return new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime();
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function CardTable({ cards }: any) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(cards);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(cards, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(cards, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  // nextJs cache revalidation doesn't work on dynamic routes, so this is a workaround
  useEffect(() => {
    setSortedData(sortData(cards, { sortBy, reversed: reverseSortDirection, search }));
  }, [cards]);

  const rows = sortedData.map((row: any) => (
    <Table.Tr key={row.name}>
      <Table.Td className={classes.td}>{row.front}</Table.Td>
      <Table.Td className={classes.td}>{row.back}</Table.Td>
      <Table.Td>{row.level}</Table.Td>
      <Table.Td>
        {new Date(row.nextReview).getTime() <= new Date().getTime() ? (
          <Text>Now</Text>
        ) : (
          <Text>{formateDate(new Date(row.nextReview))}</Text>
        )}
      </Table.Td>
      <Table.Td>
        <Group wrap="nowrap">
          <Tooltip label="Edit">
            <Button
              variant="light"
              component={Link}
              href={`/dashboard/decks/${row.deckId}/card/${row.id}`}
              leftSection={<IconEdit stroke={1.5} />}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon
              variant="filled"
              color="red"
              radius="md"
              size="lg"
              aria-label="delete-card"
              onClick={() => deleteCard(row.id)}
            >
              <IconTrash size="1.1rem" />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'front'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('front')}
            >
              Front
            </Th>
            <Th
              sorted={sortBy === 'back'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('back')}
            >
              Back
            </Th>
            <Th
              sorted={sortBy === 'level'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('level')}
            >
              Level
            </Th>
            <Th
              sorted={sortBy === 'nextReview'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('nextReview')}
            >
              Review In
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(cards).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
