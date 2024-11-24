import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { Watchlist } from '../models/watchlist.entity';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  // Fetch the user's watchlist
  @Get(':userId')
  async getWatchlist(@Param('userId') userId: string): Promise<Watchlist[]> {
    return this.watchlistService.getWatchlist(userId);
  }

  // Add a token to the watchlist
  @Post(':userId')
  async addToWatchlist(
    @Param('userId') userId: string,
    @Body() token: Watchlist,
  ): Promise<Watchlist> {
    return this.watchlistService.addToWatchlist(userId, token);
  }

  // Remove a token from the watchlist
  @Delete(':userId/:tokenId')
  async removeFromWatchlist(
    @Param('userId') userId: string,
    @Param('tokenId') tokenId: string,
  ): Promise<void> {
    return this.watchlistService.removeFromWatchlist(userId, tokenId);
  }
}
