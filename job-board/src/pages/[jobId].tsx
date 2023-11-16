import { readItem, readItems } from '@directus/sdk';
import { GetStaticPaths, GetStaticProps } from 'next';
import directus from '../lib/directus';
import { Box } from '@chakra-ui/react';
import { JobContent } from '@/components/job-content';
import { Job } from '../lib/directus';

type JobDetailsProps = {//JobDetailsProps là một kiểu props cho component JobDetails. Nó chứa một đối tượng job có kiểu là Job.
  job: Job;
};

export default function JobDetails(props: JobDetailsProps) {//JobDetails là một functional component của React. Nó nhận props là JobDetailsProps và trả về một Box container.
  const { job } = props;
  return (
    // Trong Box, nó render một component JobContent và truyền vào dữ liệu công việc (job) qua props.
    <Box p={{ base: '12', lg: '24' }}>
      <JobContent data={job} />
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  //getStaticPaths được sử dụng để tạo các đường dẫn tĩnh cho trang dựa trên dữ liệu được trả về từ Directus API.
  try {
    //readItemsYêu cầu dữ liệu công việc bằng chức năng của Directus limit: -1để tìm nạp tất cả ID công việc.
    const jobs = await directus.request(
      readItems('jobs', {
        limit: -1,
        fields: ['id'],
      })
    );
    const paths = jobs.map((job) => {
      //Maps đã truy xuất ID công việc tới một mảng paramsđối tượng để tạo các tuyến đường động.
      // Access the data property to get the array of jobs
      return {
        params: { jobId: job.id.toString() },
      };
    });
    return {//Đặt mảng đường dẫn thành các đường dẫn được tạo và fallbackthành false(không có hành vi dự phòng).
      paths: paths || [],
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  //getStaticProps được sử dụng để lấy dữ liệu của một công việc cụ thể dựa trên jobId từ Directus API.
//Triển khai getStaticPropschức năng, được sử dụng trong việc tạo trang tĩnh để tìm nạp dữ liệu cho một trang cụ thể.
  try {
    const jobId = context.params?.jobId as string;

//Trích xuất jobIdtham số từ đối tượng ngữ cảnh để xác định công việc được yêu cầu.

    const job = await directus.request(
      //Yêu cầu thông tin chi tiết về công việc bằng cách sử dụng chức năng của Directus readItemcho công việc được chỉ định
      readItem('jobs', jobId, {
        fields: ['*'],
      })
    );

    if (job) {//Sửa đổi đối tượng công việc bằng cách nối thêm logoURL với phần mở rộng DIRECTUS_URL
      job.logo = `${process.env.DIRECTUS_URL}assets/${job.logo}`;
    }

    return {
      props: {//Trả về dữ liệu công việc được tìm nạp trong propsđối tượng.
        job,
      },
    };
  } catch (error) {
    console.error('Error fetching job:', error);
    return {
      notFound: true,
    };
  }
};
