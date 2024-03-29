import { crawlBookInfo } from "@server/src/lib/BookCrawler";

class CrawlService {
  private static instance: CrawlService;
  public static getInstance(): CrawlService {
    if (!CrawlService.instance) {
      CrawlService.instance = new CrawlService();
    }
    return CrawlService.instance;
  }

  crawlBook = async (url: string) => crawlBookInfo(url);
}

export default CrawlService;
