'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconEdit,
  IconSearch,
  IconSelector,
  IconTrash,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Paper,
  Popover,
  rem,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { deleteCard } from '@/app/api/database/cards/mutations';
import classes from './CardTable.module.css';

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
  onSort: () => void;
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

export function CardTable({ cards, editable }: any) {
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
    <Table.Tr key={row.id}>
      <Table.Td className={classes.td}>{row.front}</Table.Td>
      <Table.Td className={classes.td}>{row.back}</Table.Td>
      <Table.Td>{row.level}</Table.Td>
      {editable && (
        <Table.Td>
          <Group wrap="nowrap" justify="space-between">
            {new Date(row.nextReview).getTime() <= new Date().getTime() ? (
              <Text>Now</Text>
            ) : (
              <Text>{formateDate(new Date(row.nextReview))}</Text>
            )}
            <Popover trapFocus position="bottom" withArrow shadow="md" radius="md">
              <Popover.Target>
                <ActionIcon variant="subtle">
                  <IconDots />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Group wrap="nowrap">
                  <Tooltip label="Edit">
                    <Button
                      variant="light"
                      radius="md"
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
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Paper p="sm" shadow="md" radius="md" h="100%">
      <ScrollArea h="100%" w="100%">
        <Stack gap={0}>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            radius="md"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
          />
          <Table horizontalSpacing="lg" verticalSpacing="md" miw={500} layout="fixed">
            <Table.Thead>
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
                {editable && (
                  <Th
                    sorted={sortBy === 'level'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('level')}
                  >
                    Level
                  </Th>
                )}

                {editable && (
                  <Th
                    sorted={sortBy === 'nextReview'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('nextReview')}
                  >
                    Review In
                  </Th>
                )}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack>
      </ScrollArea>
    </Paper>
  );
}
