'use client';

import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  ActionIcon,
  Tooltip,
  Modal,
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './CardTable.module.css';
import { CardEditor } from '../CardEditor/CardEditor';
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

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
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
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
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
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
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

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  const rows = sortedData.map((row: any) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.front}</Table.Td>
      <Table.Td>{row.back}</Table.Td>
      <Table.Td>{row.level}</Table.Td>
      <Table.Td>
        {new Date(row.nextReview).getTime() <= new Date().getTime() ? (
          <Text>Now</Text>
        ) : (
          <Text>{new Date(row.nextReview).toLocaleString('en-NZ')}</Text>
        )}
      </Table.Td>
      <Table.Td>
        <Group>
          <Tooltip label="Edit">
            <ActionIcon
              variant="light"
              onClick={() => {
                setSelectedCard(row);
                open();
              }}
            >
              <IconEdit stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon variant="light" onClick={() => deleteCard(row.id)}>
              <IconTrash stroke={1.5} />
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
              sorted={sortBy === 'front'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('front')}
            >
              Next Review Date
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
      <Modal size="md" opened={opened} onClose={close} title="Editor">
        <CardEditor deckId={selectedCard?.deckId as any} card={selectedCard} />
      </Modal>
    </ScrollArea>
  );
}
