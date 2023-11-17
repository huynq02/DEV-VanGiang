import { createDirectus } from "@directus/sdk";
import { rest } from '@directus/sdk';


export type CardModel = {
    id: number;
    card_holder_name: string;
    statement_date: string;
    payment_date: string;
    created_date: string;
    updated_date: string;
    card_number: number;
    Payment_day: number;
};

type Schema = {
    cards = CardModel[];
};

const directus = createDirectus<Schema>(process.env.DIRECTUS_URL!).with(rest());
export default directus;