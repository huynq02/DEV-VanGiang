import { Job } from '@/lib/directus';
import { Avatar, Box, Button, HStack, Heading } from '@chakra-ui/react';
import Link from 'next/link';

type JobContentProps = {
  data: Job;
};

export function JobContent(props: JobContentProps) {
  const { data } = props;
  const { content, logo, title, company } = data;//data được trích xuất từ props và các trường content, logo, title, company từ data

  return (
    <Box px={{ base: '12', lg: '24' }}>
      {/* Trả về một Box chứa nội dung công việc và một nút Button "Back to jobs" để quay lại trang danh sách công việc. */}
      <Button as={Link} href='/'>
        Back to jobs
      </Button>

      {/* Box chứa một HStack gồm một Avatar và một Heading để hiển thị logo công ty và tên công ty. */}
      <Box py='16'>
        <HStack spacing='4'>
          <Avatar size='lg' name={title} src={logo} />
          <Heading size='lg'>{company}</Heading>
        </HStack>
        {/* Cuối cùng, Box khác chứa nội dung công việc (content) được render bằng cách sử dụng 
        dangerouslySetInnerHTML để hiển thị nội dung HTML được truyền từ content. */}
        <Box maxW='3xl' dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
    </Box>
  );
}
