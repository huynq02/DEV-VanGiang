import { GetServerSideProps, NextPage } from 'next'
import { Card } from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import { AdminLayout } from '@layout'
import directus, { CardModel } from '@models/cardmodels'
import { newResource, Resource } from '@models/resource'
import { Pagination } from '@components/Pagination'
import { CardList } from '@components/Card'

// type Props = {
//   cardResource: Resource<CardModel>;
//   page: number;
//   perPage: number;
//   sort: string;
//   order: string;
// }

// type CardProps = {
//   data: CardModel;
// };

// const Cardindex: NextPage<Props> = (props) => {
//   const { 
//     cardResource, page, perPage, sort, order,
//   } = props


// export function Cardindex(props: CardProps) {
//   const { data, ...rest} = props;
//   const { 
//     id,
//     card_holder_name,
//     statement_date,
//     payment_date,
//     created_date,
//     updated_date,
//     card_number,
//     Payment_day,
//   } = data;

const Cardindex = () => {
  const [cardData, setCardData] = useState<CardModel[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sử dụng Directus SDK để lấy dữ liệu từ Directus
        const response = await directus.items<CardModel>('your_collection_name').readMany();
        
        if (response?.data) {
          setCardData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data from Directus:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <AdminLayout>
      <Card>
        <Card.Header>Card</Card.Header>
        <Card.Body>
          <Pagination meta={resource.data} /> 
          <CardList cardsindex={resource.data} />
          <Pagination meta={resource.data} />
        </Card.Body>
      </Card>
    </AdminLayout>
  )
}

// const Pokemons: NextPage<Props> = (props) => {
//   const {
//     pokemonResource, page, perPage, sort, order,
//   } = props

//   const pokemonListURL = `${process.env.NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL}pokemons` || ''

//   // swr: data -> axios: data -> resource: data
//   const { data: { data: resource } } = useSWRAxios<Resource<Pokemon>>({
//     url: pokemonListURL,
//     params: {
//       _page: page,
//       _limit: perPage,
//       _sort: sort,
//       _order: order,
//     },
//     transformResponse: transformResponseWrapper((d: Pokemon[], h) => {
//       const total = h ? parseInt(h['x-total-count'], 10) : 0
//       return newResource(d, total, page, perPage)
//     }),
//   }, {
//     data: pokemonResource,
//     headers: {
//       'x-total-count': pokemonResource.meta.total.toString(),
//     },
//   })

//   return (
//     <AdminLayout>
//       <Card>
//         <Card.Header>Card</Card.Header>
//         <Card.Body>
//           <Pagination meta={resource.meta} />
//           <PokemonList pokemons={resource.data} />
//           <Pagination meta={resource.meta} />
//         </Card.Body>
//       </Card>
//     </AdminLayout>
//   )
// }

// export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
//   const pokemonListURL = `${process.env.NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL}pokemons` || ''
//   let page = 1
//   if (context.query?.page && typeof context.query.page === 'string') {
//     page = parseInt(context.query.page, 10)
//   }

//   let perPage = 20
//   if (context.query?.per_page && typeof context.query.per_page === 'string') {
//     perPage = parseInt(context.query.per_page.toString(), 10)
//   }

//   let sort = 'id'
//   if (context.query?.sort && typeof context.query.sort === 'string') {
//     sort = context.query.sort
//   }

//   let order = 'asc'
//   if (context.query?.order && typeof context.query.order === 'string') {
//     order = context.query.order
//   }

//   const { data: pokemons, headers } = await axios.get<Pokemon[]>(pokemonListURL, {
//     params: {
//       _page: page,
//       _limit: perPage,
//       _sort: sort,
//       _order: order,
//     },
//   })

//   const total = parseInt(headers['x-total-count'], 10)
//   const pokemonResource: Resource<Pokemon> = newResource(pokemons, total, page, perPage)

//   return {
//     props: {
//       pokemonResource,
//       page,
//       perPage,
//       sort,
//       order,
//     }, // will be passed to the page component as props
//   }
// }

export default Cardindex
