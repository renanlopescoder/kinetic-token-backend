import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Watchlist {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  image: string;

  @Column('float')
  price_change_percentage_24h: number;

  @Column('float')
  market_cap: number;

  @Column('float')
  current_price: number;
}
