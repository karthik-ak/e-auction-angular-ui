export class Bid {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    pin?: string;
    phone?: number;
    email?: string;
    productId?: string;
    bidAmount: number = 0;
    bidStatus?: string;
    comment?: string;
    createdAt?: Date;
}
