import {
  Avatar,
  Box,
  HStack,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  MdBusiness,
  MdLocationPin,
  MdOutlineAttachMoney,
} from 'react-icons/md';
import { Job } from '@/lib/directus';
import { friendlyTime } from '@/lib/friendly-time';

//xử lý dữ liệu của 1 thành phần. Dùng để hiển thi 1 thành phần


type JobCardProps = {//JobCardProps này sẽ nhận 1 đối tượng là job để hiển thị những thành phần mong muốn mà job cần hoặc có (giống model)
  data: Job;
};

export function JobCard(props: JobCardProps) {// JobCard nhận (props: tham số (có data hiển thị theo job))là 1 đối tượng Job
  const { data, ...rest } = props;
  const {
    id,
    card_holder_name,
    card_number,
  } = data; // trích xuất thông tin cần thiết từ đối tượng job 

  return (
    <Box
      border='1px solid'
      borderColor='gray.300'
      borderRadius='md'
      _hover={{ borderColor: 'black', boxShadow: 'sm' }}
      p='6'
      {...rest}
    >
      <LinkBox as='article'>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing='8'>
          <Box>
            <LinkOverlay as={NextLink} href={`/${id}`}>
              <Heading size='md'>{card_holder_name}</Heading>
            </LinkOverlay>
            <Text>{card_number}</Text>
          </Box>
        </Stack>
      </LinkBox>
    </Box>
  );
}
