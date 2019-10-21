export class ChartTab {
    month: string;
    price: string;
}

export class Details {
    brand: string;
    ref: string;
    year: string;
}

export class Item {
    id: number;
    name: string;
    chartData: ChartTab[];
    details: Details;
    description: string;
}
