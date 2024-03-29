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
    const bookInfo: Record<string, number | string> = {
      title: $("div.gd_titArea h2.gd_name").text(),
      price: convertPriceToNumber(
        $(
          "#yDetailTopWrap > div.topColRgt > div.gd_infoBot > div.gd_infoTbArea > div:nth-child(3) > table > tbody > tr:nth-child(1) > td > span > em"
        ).text()
      ),
      image: $("span.gd_img img.gImg").attr("src") || "",
      contents: $("div#infoset_toc div.infoWrap_txt textarea").text(),
      intro: $("div#infoset_introduce div.infoWrap_txt textarea").text(),
      authors: removeAuthorSuffix($("span.gd_pubArea span.gd_auth").text()),
      publisher: $("span.gd_pubArea span.gd_pub a").text(),
      pubDate: $("span.gd_pubArea span.gd_date").text(),
      isbn: $(
        "#infoset_specific > div.infoSetCont_wrap > div > table > tbody > tr:nth-child(3) > td"
      ).text(),
    };

    for (const key in bookInfo) {
      if (typeof bookInfo[key] === "string") {
        bookInfo[key] = trimAndRemoveNewLine(bookInfo[key]);
      }
    }
    return bookInfo;
  } catch (e) {
    console.error(e);
    return null;
  }
};
