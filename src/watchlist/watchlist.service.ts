import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist } from '../models/watchlist.entity';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
  ) {}

  // Fetch the user's watchlist
  async getWatchlist(userId: string): Promise<Watchlist[]> {
    return this.watchlistRepository.find({ where: { userId } });
  }

  // Add a token to the watchlist
  async addToWatchlist(userId: string, token: Watchlist): Promise<Watchlist> {
    const watchlistEntry = this.watchlistRepository.create({
      id: token.id,
      userId,
      name: token.name,
      symbol: token.symbol,
      image: token.image,
      price_change_percentage_24h: token.price_change_percentage_24h,
      market_cap: token.market_cap,
      current_price: token.current_price,
    });
    return this.watchlistRepository.save(watchlistEntry);
  }

  // Remove a token from the watchlist
  async removeFromWatchlist(userId: string, tokenId: string): Promise<void> {
    await this.watchlistRepository.delete({ userId, id: tokenId });
  }
}
