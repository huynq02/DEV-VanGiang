import { JobList } from '@/components/job-list';//// Import component JobList
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';// Import các components từ thư viện Chakra UI
import { readItems } from '@directus/sdk';// Import function readItems từ Directus SDK
import Head from 'next/head';// Import component Head từ Next.js
import { useRouter } from 'next/router';// Import hook useRouter từ Next.js
import { FaSearch } from 'react-icons/fa';// Import icon FaSearch từ thư viện react-icons
import directus, { Job } from '../lib/directus';// Import directus và Job từ file lib/directus

export default function Home(props: { jobs: Job[] }) {
  const { jobs } = props;// Nhận danh sách công việc từ props
  const router = useRouter(); // Sử dụng hook useRouter để lấy thông tin về route hiện tại

   // Lấy giá trị từ query parameter 'search' nếu có
  const searchQuery = router.query.search?.toString();

  // Lọc danh sách công việc dựa trên query 'search'
  const searchResult = searchQuery
    ? jobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : jobs;

  return (
    <>
      <Head>
        <title>Job Board</title>
        <meta
          name='description'
          content='Job board app to connect job seekers to opportunities'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Box p={{ base: '12', lg: '24' }}>
          <Stack mb='8' direction={{ base: 'column', md: 'row' }}>
            <Heading flex='1'>Find Your Dream Job</Heading>
            <InputGroup w='auto'>
              <InputLeftElement color='gray.400'>
                <FaSearch />
              </InputLeftElement>
              <Input
                placeholder='Search jobs...'
                onChange={(event) => {
                  const value = event.target.value;

                  router.replace({
                    query: { search: value },
                  });
                }}
              />
            </InputGroup>
          </Stack>
          <JobList data={searchResult} />
        </Box>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Fetch danh sách công việc từ Directus
    const jobs = await directus.request(
      readItems('cards', {
        limit: -1,
        fields: ['*'],
      })
    );

    if (!jobs) {
      return {
        notFound: true,// Trả về 404 nếu không tìm thấy công việc
      };
    }

     // Format URL của hình ảnh công việc
    jobs.forEach((job) => {
      job.logo = `${process.env.DIRECTUS_URL}assets/${job.logo}`;
    });

    return {
      props: {// Truyền danh sách công việc là props cho component Home
        jobs,
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      notFound: true,// Trả về 404 nếu không tìm thấy công việc
    };
  }
}
