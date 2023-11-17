import { Dropdown, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { CardModel } from '@models/cardmodels'
import { THSort } from '@components/TableSort'

// const typeColorMap: Record<string, string> = {
//   normal: '#aa9',
//   fighting: '#b54',
//   flying: '#89f',
//   poison: '#a59',
//   ground: '#db5',
//   rock: '#ba6',
//   bug: '#ab2',
//   ghost: '#66b',
//   steel: '#aab',
//   fire: '#f42',
//   water: '#39f',
//   grass: '#7c5',
//   electric: '#fc3',
//   psychic: '#f59',
//   ice: '#6cf',
//   dragon: '#76e',
//   dark: '#754',
//   fairy: '#e9e',
//   unknown: '#aa9',
//   shadow: '#aa9',
// }

// type TypeLabelProps = {
//   type: string;
// }

// const TypeLabel = ({ type }: TypeLabelProps) => (
//   <span
//     className="text-white d-inline-block text-uppercase text-center rounded-1 shadow-sm me-2"
//     style={{
//       backgroundColor: typeColorMap[type],
//       textShadow: '1px 1px 2px rgb(0 0 0 / 70%)',
//       fontSize: '.7rem',
//       width: '70px',
//     }}
//   >
//     {type}
//   </span>
// )

type Props = {
  cardsindex: CardModel[];
} & Pick<Parameters<typeof THSort>[0], 'setSort' | 'setOrder'>

export default function CardList(props: Props) {
  const { cardsindex, setSort, setOrder } = props

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th><THSort name="id" setSort={setSort} setOrder={setOrder}>#</THSort></th>
          <th aria-label="Photo" />
          <th><THSort name="name" setSort={setSort} setOrder={setOrder}>CardName</THSort></th>
          {/* <th>Type</th> */}
          {/* <th className="text-center">Egg group</th> */}
          <th className="text-end"><THSort name="hp" setSort={setSort} setOrder={setOrder}>StatementDate</THSort></th>
          <th className="text-end"><THSort name="attack" setSort={setSort} setOrder={setOrder}>PaymentDate</THSort></th>
          <th className="text-end"><THSort name="defense" setSort={setSort} setOrder={setOrder}>CreatedDate</THSort></th>
          <th className="text-end"><THSort name="special_attack" setSort={setSort} setOrder={setOrder}>UpdatedDate</THSort></th>
          <th className="text-end"><THSort name="special_defense" setSort={setSort} setOrder={setOrder}>CardNumber</THSort></th>
          <th className="text-end"><THSort name="speed" setSort={setSort} setOrder={setOrder}>PaymentDay</THSort></th>
          {/* <th className="text-end"><THSort name="total" setSort={setSort} setOrder={setOrder}>Total</THSort></th> */}
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {cardsindex.map((cards) => (
          <tr key={cards.id}>
            <td>{cards.id}</td>
            <td>
              {/* <div className="position-relative mx-auto" style={{ width: '70px', height: '70px' }}>
                <Image
                  fill
                  style={{ objectFit: 'contain' }}
                  alt={pokemon.pokemondb_identifier}
                  sizes="5vw"
                  src={`https://img.pokemondb.net/sprites/home/normal/2x/${pokemon.pokemondb_identifier}.jpg`}
                />
              </div> */}
            </td>
            <td>{cards.card_holder_name}</td>
            {/* <td>
              {cards.types.map((type) => <TypeLabel key={type} type={type} />)}
            </td> */}
            {/* <td className="text-center" style={{ whiteSpace: 'pre' }}>{pokemon.egg_groups.join('\n')}</td> */}
            <td className="text-end">{cards.statement_date}</td>
            <td className="text-end">{cards.payment_date}</td>
            <td className="text-end">{cards.created_date}</td>
            <td className="text-end">{cards.updated_date}</td>
            <td className="text-end">{cards.card_number}</td>
            <td className="text-end">{cards.payment_date}</td>
            {/* <td className="text-end">{cards.total}</td> */}
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${cards.id}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    href="#/action-3"
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
