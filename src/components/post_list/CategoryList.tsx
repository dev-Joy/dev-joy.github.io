'use client';

import { Category } from '@/service/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useRouter } from 'next/navigation';
import { CategoryButton } from './CategoryButton';

type Props = {
  allPostCount: number;
  categoryList: Category[];
  selectedCategory?: string;
};

export default function CategoryList({
  allPostCount,
  categoryList,
  selectedCategory = 'all',
}: Props) {
  const router = useRouter();
  const onCategoryChange = (category: string) => {
    const url = category === 'all' ? '/posts' : `/posts/${category}`;
    router.push(url);
  };

  return (
    <>
      <section className='mb-10 hidden sm:block'>
        <ul className='flex gap-3'>
          <CategoryButton
            href='/blog'
            isCurrent={selectedCategory === 'all'}
            displayName='All'
            count={allPostCount}
          />
          {categoryList.map(({ category, count }) => (
            <CategoryButton
              key={category}
              href={`/${category}`}
              displayName={category}
              isCurrent={category === selectedCategory}
              count={count}
            />
          ))}
        </ul>
      </section>
      <section className='mb-10 sm:hidden'>
        <Select
          onValueChange={onCategoryChange}
          defaultValue={selectedCategory}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All ({allPostCount})</SelectItem>
            {categoryList.map(({ category, count }) => (
              <SelectItem
                key={category}
                value={category}
              >
                {category} ({count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </>
  );
}
