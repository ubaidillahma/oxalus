import logoBusd from "../../assets/busd-bep20.png";
import logoUsdt from "../../assets/usdt-bep20.png";

export function stringConversionSubs(message: string) {
  return message.split("\r\n");
}

export function ucfirst(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function prettyDate(time: string) {
  var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
    diff = (new Date().getTime() - date.getTime()) / 1000,
    day_diff = Math.floor(diff / 86400);
  var year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
    return (
      year.toString() +
      "-" +
      (month < 10 ? "0" + month.toString() : month.toString()) +
      "-" +
      (day < 10 ? "0" + day.toString() : day.toString())
    );
  var r =
    (day_diff == 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
    (day_diff == 1 && "Yesterday") ||
    (day_diff < 7 && day_diff + " days ago") ||
    (day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago");
  return r;
}

export function SignalTypeResult(props: { type: string }) {
  switch (props?.type) {
    case "profit":
      return <span className="text-success">{ucfirst(props?.type)}</span>;
    case "loss":
      return <span className="text-danger">{ucfirst(props?.type)}</span>;
    case "running":
      return <span className="text-default">{ucfirst(props?.type)}</span>;
    case "cancel":
      return <span className="text-warning">{ucfirst(props?.type)}</span>;
    default:
      return <span className="text-default">{ucfirst(props?.type)}</span>;
  }
}

export function SignalTypeStatus(props: { type: string }) {
  switch (props?.type) {
    case "active":
      return <span className="text-success">{ucfirst(props?.type)}</span>;
    case "pending":
      return <span className="text-warning">{ucfirst(props?.type)}</span>;
    default:
      return <span className="text-danger">{ucfirst(props?.type)}</span>;
  }
}

export function parseMd(md: string) {
  //ul
  md = md.replace(/^\s*\n\*/gm, "<ul>\n*");
  md = md.replace(/^(\*.+)\s*\n([^\*])/gm, "$1\n</ul>\n\n$2");
  md = md.replace(/^\*(.+)/gm, "<li>$1</li>");

  //ol
  md = md.replace(/^\s*\n\d\./gm, "<ol>\n1.");
  md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, "$1\n</ol>\n\n$2");
  md = md.replace(/^\d\.(.+)/gm, "<li>$1</li>");

  //blockquote
  md = md.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

  //h
  md = md.replace(/[\#]{6}(.+)/g, "<h6>$1</h6>");
  md = md.replace(/[\#]{5}(.+)/g, "<h5>$1</h5>");
  md = md.replace(/[\#]{4}(.+)/g, "<h4>$1</h4>");
  md = md.replace(/[\#]{3}(.+)/g, "<h3>$1</h3>");
  md = md.replace(/[\#]{2}(.+)/g, "<h2>$1</h2>");
  md = md.replace(/[\#]{1}(.+)/g, "<h1>$1</h1>");

  //alt h
  md = md.replace(/^(.+)\n\=+/gm, "<h1>$1</h1>");
  md = md.replace(/^(.+)\n\-+/gm, "<h2>$1</h2>");

  //images
  md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

  //links
  md = md.replace(
    /[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g,
    '<a href="$2" title="$4">$1</a>'
  );

  //font styles
  md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, "<b>$1</b>");
  md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, "<i>$1</i>");
  md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, "<del>$1</del>");

  //pre
  md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
  md = md.replace(/^\`\`\`\s*\n/gm, "</pre>\n\n");

  //code
  md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, "<code>$1</code>");

  //p
  md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
    return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
      ? m
      : "<p>" + m + "</p>";
  });

  //strip p from pre
  md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, "$1$2");

  return md;
}

export const PaymentTradeType = [
  {
    id: 1,
    type_currency: "usdtbsc",
    path: logoUsdt,
    network: "BSC",
    names: "USDT",
    pair: "USDT BEP20",
  },
  {
    id: 2,
    type_currency: "busdbsc",
    path: logoBusd,
    network: "BSC",
    names: "BUSD",
    pair: "BUSD BEP20",
  },
];
