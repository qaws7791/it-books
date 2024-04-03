import AppError from "@server/src/lib/AppError";
import { load } from "cheerio";

const removeAuthorSuffix = (text: string) => {
  const match = text.match(/\d+\s*명/);
  if (match && match.index !== undefined) {
    return text.slice(0, match.index + match.length + 1);
  } else {
    return text;
  }
};

const trimAndRemoveNewLine = (text: string) => {
  return text.trim().replace(/\n/g, "");
};

const convertPriceToNumber = (text: string) => {
  return Number(text.replace(/원|,/g, ""));
};

export const crawlBookInfo = async (url: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        UserAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    });

    const html = await res.text();
    const $ = load(html);
    console.log(
      "price",
      $(
        "#yDetailTopWrap > div.topColRgt > div.gd_infoBot > div.gd_infoTbArea > div:nth-child(3) > table > tbody > tr:nth-child(1) > td > span > em"
      ).text()
    );
    // Find all h1 tags
    const bookInfo = {
      title: trimAndRemoveNewLine($("div.gd_titArea h2.gd_name").text()),
      price: convertPriceToNumber(
        $(
          "#yDetailTopWrap > div.topColRgt > div.gd_infoBot > div.gd_infoTbArea > div:nth-child(3) > table > tbody > tr:nth-child(1) > td > span > em"
        ).text()
      ),
      image: trimAndRemoveNewLine($("span.gd_img img.gImg").attr("src") || ""),
      contents: trimAndRemoveNewLine(
        $("div#infoset_toc div.infoWrap_txt textarea").text()
      ),
      intro: trimAndRemoveNewLine(
        $("div#infoset_introduce div.infoWrap_txt textarea").text()
      ),
      authors: trimAndRemoveNewLine(
        removeAuthorSuffix($("span.gd_pubArea span.gd_auth").text())
      ),
      publisher: trimAndRemoveNewLine(
        $("span.gd_pubArea span.gd_pub a").text()
      ),
      pubDate: trimAndRemoveNewLine($("span.gd_pubArea span.gd_date").text()),
      isbn: trimAndRemoveNewLine(
        $(
          "#infoset_specific > div.infoSetCont_wrap > div > table > tbody > tr:nth-child(3) > td"
        ).text()
      ),
    };
    return bookInfo;
  } catch (e) {
    console.error(e);
    throw new AppError("CrawlBookNotFound");
  }
};
