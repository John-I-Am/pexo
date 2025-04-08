'use client';

import { TextInput, rem } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';

export function Searchbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <TextInput
      radius="md"
      size="sm"
      placeholder="Search Decks"
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} />}
      defaultValue={searchParams.get('query')?.toString()}
      onChange={({ target }) => {
        handleSearch(target.value);
      }}
    />
  );
}
