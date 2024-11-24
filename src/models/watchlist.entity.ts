import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tokenId: string;

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
