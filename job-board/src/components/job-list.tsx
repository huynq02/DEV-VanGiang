import { Stack } from '@chakra-ui/react';
import { JobCard } from './job-card';
import { Job } from '@/lib/directus';

//Dùng để hiển thị 1 list các nhiều thành phần của JobCard


type JobListProps = {  //Props dành cho JobList(chỉ định rõ ràng rằng props này sẽ nhận 1 mảng các đối tượng Job([]: mảng)
  data: Job[];
};

export function JobList(props: JobListProps) {// JobList nhận props là 1 mảng data chứa danh sách card
  const { data } = props; 

  return (
    // sử dụng component Stack từ Chakra UI để sắp xếp các JobCard theo 1 khoảng cách (spacing)
    <Stack spacing='4'> 
      {data.map((job, index) => (//Sử dụng data.map() để lặp qua từng job trong mảng data.
        <JobCard key={job.id} data={job} />//Mỗi lần lặp, nó tạo một JobCard với thuộc tính key là 
                                        //index của công việc trong mảng và truyền đối tượng job là dữ liệu của công việc đó vào JobCar
      ))}
    </Stack>
  );
}
