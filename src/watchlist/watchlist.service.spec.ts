import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistService } from './watchlist.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Watchlist } from '../models/watchlist.entity';

describe('WatchlistService', () => {
  let watchlistService: WatchlistService;
  let watchlistRepository: Repository<Watchlist>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchlistService,
        {
          provide: getRepositoryToken(Watchlist),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    watchlistService = module.get<WatchlistService>(WatchlistService);
    watchlistRepository = module.get<Repository<Watchlist>>(
      getRepositoryToken(Watchlist),
    );
  });

  it('should be defined', () => {
    expect(watchlistService).toBeDefined();
    expect(watchlistRepository).toBeDefined();
  });

  describe('getWatchlist', () => {
    it('should return the watchlist for a given user', async () => {
      const mockWatchlist: Watchlist[] = [
        {
          id: '1',
          tokenId: '1',
          name: 'Bitcoin',
          symbol: 'BTC',
          image: 'btc.png',
          price_change_percentage_24h: 2.5,
          market_cap: 1000000000,
          current_price: 50000,
          userId: 'user1',
        },
        {
          id: '1',
          tokenId: '1',
          name: 'Bitcoin',
          symbol: 'BTC',
          image: 'btc.png',
          price_change_percentage_24h: 2.5,
          market_cap: 1000000000,
          current_price: 50000,
          userId: 'user1',
        },
      ];

      jest.spyOn(watchlistRepository, 'find').mockResolvedValue(mockWatchlist);

      const result = await watchlistService.getWatchlist('user1');

      expect(watchlistRepository.find).toHaveBeenCalledWith({
        where: { userId: 'user1' },
      });
      expect(result).toEqual(mockWatchlist);
    });
  });

  describe('addToWatchlist', () => {
    it('should add a token to the watchlist', async () => {
      const mockCoingeckoToken = {
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        image: 'btc.png',
        price_change_percentage_24h: 2.5,
        market_cap: 1000000000,
        current_price: 50000,
      } as Watchlist;

      const mockSavedEntry = {
        ...mockCoingeckoToken,
        userId: 'user1',
      } as Watchlist;

      jest.spyOn(watchlistRepository, 'create').mockReturnValue(mockSavedEntry);
      jest.spyOn(watchlistRepository, 'save').mockResolvedValue(mockSavedEntry);

      const result = await watchlistService.addToWatchlist(
        'user1',
        mockCoingeckoToken,
      );

      expect(watchlistRepository.create).toHaveBeenCalledWith({
        tokenId: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        image: 'btc.png',
        price_change_percentage_24h: 2.5,
        market_cap: 1000000000,
        current_price: 50000,
        userId: 'user1',
      });

      expect(watchlistRepository.save).toHaveBeenCalledWith(mockSavedEntry);
      expect(result).toEqual(mockSavedEntry);
    });
  });

  describe('removeFromWatchlist', () => {
    it('should remove a token from the watchlist', async () => {
      jest.spyOn(watchlistRepository, 'delete').mockResolvedValue(undefined);

      await watchlistService.removeFromWatchlist('user1', '1');

      expect(watchlistRepository.delete).toHaveBeenCalledWith({
        userId: 'user1',
        id: '1',
      });
    });
  });
});
