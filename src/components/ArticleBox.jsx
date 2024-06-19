import axios from "axios";
import { useEffect, useState } from "react";
// import Pagination from "./Pagination";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(4);
  const [selectedFilter, setSelectedFilter] = useState("");
  const categoriesArray = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  // const data = {
  //   status: "ok",
  //   totalResults: 51,
  //   articles: [
  //     {
  //       source: {
  //         id: null,
  //         name: "Crictracker.com",
  //       },
  //       author: "CricTracker",
  //       title:
  //         "RJ vs ENT Live Score, Match 25 | Ratnagiri Jets vs Eagle Nashik Titans Match 25 Live Score & Ball by Ball Commentary Updates - CricTracker",
  //       description:
  //         "RJ vs ENT Match 25, Live Score: Get all the latest RJ vs ENT Live Score of Match 25 along with ball by ball commentary & updates on CricTracker.",
  //       url: "https://www.crictracker.com/live-scores/rj-vs-ent-match-25-t20-maharashtra-premier-league-16-jun-2024/",
  //       urlToImage:
  //         "https://www.crictracker.com/images/CricTracker-Facebook-Preview.jpg",
  //       publishedAt: "2024-06-16T11:22:00Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Cricket.one",
  //       },
  //       author: "Ritam",
  //       title:
  //         "[Watch] RCB's Smriti Mandhana Raises Chinnaswamy Roof With Flamboyant Knock Vs SA - OneCricket",
  //       description:
  //         "Smriti Mandhana, Royal Challengers Bangalore’s very own girl who helped them win the WPL title just a few months ago, was back in action at M. Chinnaswamy Stadium on Sunday when India took on South Africa in the first ODI of the multi-format series.",
  //       url: "https://cricket.one/match-hub/watch-rcbs-smriti-mandhana-raises-chinnaswamy-roof-with-flamboyant-knock-vs-sa/666ebe6fbcff178ac083bc9d",
  //       urlToImage:
  //         "https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1718532935214_mandhana_ind_vs_sa (1).jpg",
  //       publishedAt: "2024-06-16T10:29:03Z",
  //       content:
  //         "Smriti Mandhana in action vs SA (X.com)\r\nSmriti Mandhana, Royal Challengers Bangalores very own girl who helped them win the WPL title just a few months ago, was back in action at M. Chinnaswamy Stad… [+978 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Hindustan Times",
  //       },
  //       author: "HT Sports Desk",
  //       title:
  //         "'Kohli, Rohit, the way they are batting...': Jaffer passes huge verdict on India's batting woes ahead of T20 WC Super 8s - Hindustan Times",
  //       description:
  //         "Wasim Jaffer passed his verdict on Virat Kohli, Rohit Sharma's batting form ahead of India's T20 World Cup Super 8 opener vs Afghanistan. | Crickit",
  //       url: "https://www.hindustantimes.com/cricket/kohli-rohit-the-way-they-are-batting-jaffer-passes-huge-verdict-on-indias-batting-woes-ahead-of-t20-wc-super-8s-101718533109509.html",
  //       urlToImage:
  //         "https://www.hindustantimes.com/ht-img/img/2024/06/16/1600x900/ANI-20240609316-0_1718533239088_1718533307177.jpg",
  //       publishedAt: "2024-06-16T10:28:27Z",
  //       content:
  //         "Unbeaten India begin their Super 8 campaign on Thursday, taking on Afghanistan in Bridgetown. Rohit Sharma and Co. will also face Australia in the Super 8 stage, with their other opponent not yet con… [+2384 chars]",
  //     },
  //     {
  //       source: {
  //         id: "the-times-of-india",
  //         name: "The Times of India",
  //       },
  //       author: "TOI Sports Desk",
  //       title:
  //         "Unbelievable! Australia record most ever dropped catches in men's T20 World Cup history against Scotland - The Times of India",
  //       description:
  //         "Cricket News: The T20 World Cup match between Australia and Scotland saw Australia's record-setting fielding lapses despite their eventual five-wicket win. Hosted a",
  //       url: "https://timesofindia.indiatimes.com/sports/cricket/icc-mens-t20-world-cup/unbelievable-australia-record-most-ever-dropped-catches-in-mens-t20-world-cup-history-against-scotland/articleshow/111035925.cms",
  //       urlToImage:
  //         "https://static.toiimg.com/thumb/msid-111036059,width-1070,height-580,imgsize-23594,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
  //       publishedAt: "2024-06-16T09:58:00Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "NDTV News",
  //       },
  //       author: "Asian News International",
  //       title:
  //         "Babar Azam Unlikely To Be Given Back Pakistan Test Captaincy: Reports - NDTV Sports",
  //       description:
  //         "Pakistan have crashed out in the group stage of the 2024 T20 World Cup.",
  //       url: "https://sports.ndtv.com/t20-world-cup-2024/babar-azam-unlikely-to-be-given-back-pakistan-test-captaincy-reports-5898024",
  //       urlToImage:
  //         "https://c.ndtvimg.com/2024-05/tbg02o78_babar-azam-vs-virat-kohli-_625x300_07_May_24.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=675",
  //       publishedAt: "2024-06-16T09:28:53Z",
  //       content:
  //         "Babar Azam's prospects of becoming Test captain again have seemingly taken a major hit after the USA ended Pakistan's chances of claiming a spot in the Super 8 stage of the T20 World Cup. Sources tol… [+1958 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Cricket.one",
  //       },
  //       author: "Akshita Patel",
  //       title:
  //         "Rizwan, Shadab, Iftikhar,...? PAK Players Likely To Be Dropped After T20 WC Exit - OneCricket",
  //       description:
  //         "In a bold call following the shocking group stage exit from the 2024 T20 World Cup, PCB are likely to take action against underperforming players including Mohammad Rizwan, Shadab Khan, Mohammad Amir and many more by dropping them off the national squad .",
  //       url: "https://cricket.one/cricket-news/rizwan-shadab-iftikhar-pak-players-likely-to-be-dropped-after-t20-wc-exit/666ea990fdc09c66a532c6d8",
  //       urlToImage:
  //         "https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1718462738337_PAK_Players_T20WC2024.jpg",
  //       publishedAt: "2024-06-16T09:00:00Z",
  //       content:
  //         "Pakistan cricket team under scanner after shock T20 WC exit (X.com)\r\nIn a bold call following the shocking group stage exit from the 2024 T20 World Cup, PCB are likely to take action against underper… [+3371 chars]",
  //     },
  //     {
  //       source: {
  //         id: "espn-cric-info",
  //         name: "ESPN Cric Info",
  //       },
  //       author: "Srinidhi Ramanujam",
  //       title:
  //         "ODI debuts for Asha, Dercksen as India opt to bat - ESPNcricinfo",
  //       description:
  //         "South Africa captain Wolvaardt said that Kapp will play the first match as a pure batter to manage a minor back injury",
  //       url: "https://www.espncricinfo.com/series/india-women-vs-south-africa-women-2024-1434282/india-women-vs-south-africa-women-1st-odi-1434287/match-report",
  //       urlToImage:
  //         "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/382800/382896.6.jpg",
  //       publishedAt: "2024-06-16T08:18:16Z",
  //       content:
  //         "Asha Sobhana is on ODI debut, having made her T20I bow in Bangladesh last month  •  Srinidhi Ramanujam/ESPNcricinfo",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Livemint",
  //       },
  //       author: "Livemint",
  //       title:
  //         "Gautam Gambhir all set to take charge as India's head coach as BCCI allows him to choose his own support staff: Report | Mint - Mint",
  //       description:
  //         "Gautam Gambhir likely to succeed Rahul Dravid as India head coach post-2024 World Cup. BCCI to confirm appointment soon, dependent on India's World Cup performance. Gambhir's coaching background includes mentoring Lucknow Super Giants and Kolkata Knight Rider…",
  //       url: "https://www.livemint.com/sports/cricket-news/gautam-gambhir-all-set-to-take-charge-as-indias-head-coach-as-bcci-allows-him-to-choose-his-own-support-staff-report-11718521928600.html",
  //       urlToImage:
  //         "https://www.livemint.com/lm-img/img/2024/06/16/1600x900/CRICKET-IND-IPL-T20-KOLKATA-MUMBAI-17_1716714799172_1718523922107.jpg",
  //       publishedAt: "2024-06-16T07:55:49Z",
  //       content:
  //         "With Rahul Dravid's tenure as India head coach coming to an end after the 2024 World Cup, the clamour for the appointment of India's next head coach has intensified. Reportedly, Gautam Gambhir has al… [+2357 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Crictracker.com",
  //       },
  //       author: "CricTracker Staff",
  //       title:
  //         "T20 World Cup 2024: Match 36, PAK vs IRE Match Prediction – Who will win today’s T20 WC match between PAK vs IRE? - CricTracker",
  //       description:
  //         "Preview:Pakistan(PAK) will face Ireland(IRE) in the 36th game of the T20 World Cup 2024 at Central Broward Regional Park Stadium Turf Ground in Lauderhill, Florida, starting at 8:00 PM IST on June 16.",
  //       url: "https://www.crictracker.com/cricket-match-predictions/t20-world-cup-2024-match-36-pak-vs-ire-match-prediction-who-will-win-todays-t20-world-cup-match-between-pak-vs-ire/",
  //       urlToImage:
  //         "https://media.crictracker.com/media/attachments/1718438196122_Pakistan-vs-Ireland.jpeg",
  //       publishedAt: "2024-06-16T07:30:00Z",
  //       content:
  //         "Preview:\r\nPakistan(PAK) will face Ireland(IRE) in the 36th game of the T20 World Cup 2024 at Central Broward Regional Park Stadium Turf Ground in Lauderhill, Florida, starting at 8:00 PM IST on June … [+3474 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "NDTV News",
  //       },
  //       author: "NDTV Sports Desk",
  //       title:
  //         '"Hamara Neta Kaisa Ho": Crowd Chant Goes Viral. Here\'s How Virat Kohli Reacted - Watch | Cricket News - NDTV Sports',
  //       description:
  //         "A hilarious chant from the crowd during the T20 World Cup 2024 match between India and United States has gone viral on social media.",
  //       url: "https://sports.ndtv.com/t20-world-cup-2024/hamara-neta-kaisa-ho-crowd-chant-goes-viral-heres-how-virat-kohli-reacted-watch-5897632",
  //       urlToImage:
  //         "https://c.ndtvimg.com/2024-06/5414lud_virat-kohli-afp_625x300_12_June_24.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675",
  //       publishedAt: "2024-06-16T06:07:48Z",
  //       content:
  //         "A hilarious chant from the crowd during the T20 World Cup 2024 match between India and United States has gone viral on social media. In a video that has been shared multiple times by users on the soc… [+2750 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "The Indian Express",
  //       },
  //       author: "The Indian Express",
  //       title:
  //         "Imad Wasim on Pakistan cricket: ‘We used to rule in T20 cricket…’ - The Indian Express",
  //       description: null,
  //       url: "https://indianexpress.com/article/sports/cricket/imad-wasim-on-pakistan-cricket-we-used-to-rule-in-t20-cricket-9395495/",
  //       urlToImage: null,
  //       publishedAt: "2024-06-16T05:42:04Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Hindustan Times",
  //       },
  //       author: "HT Sports Desk",
  //       title:
  //         "T20 World Cup Super 8 groups, full fixture: Which teams will India face? England clubbed with? All you need to know - Hindustan Times",
  //       description:
  //         "Here's all you need to know about the Super 8 stage of the 2024 T20 World Cup | Crickit",
  //       url: "https://www.hindustantimes.com/cricket/t20-world-cup-super-8-groups-full-fixture-which-teams-will-india-face-england-clubbed-with-all-you-need-to-know-101718512662224.html",
  //       urlToImage:
  //         "https://www.hindustantimes.com/ht-img/img/2024/06/16/1600x900/india_england_super_8_1718513487449_1718513495545.jpg",
  //       publishedAt: "2024-06-16T05:25:59Z",
  //       content:
  //         "The preliminary stage of the ongoing 2024 T20 World Cup, which begins on Wednesday in the West Indies and ends on Monday with Group C matches in Trinidad and Gros Islet, has already set the fixture f… [+3251 chars]",
  //     },
  //     {
  //       source: {
  //         id: "espn-cric-info",
  //         name: "ESPN Cric Info",
  //       },
  //       author: "ESPNcricinfo staff",
  //       title:
  //         "'Just seemed like the right time' - Wiese retires from international cricket - ESPNcricinfo",
  //       description:
  //         "Allrounder ends career with 54 T20Is and 15 ODIs to his name",
  //       url: "https://www.espncricinfo.com/story/t20-world-cup-2024-david-wiese-retires-from-international-cricket-1438976",
  //       urlToImage:
  //         "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/382900/382924.6.jpg",
  //       publishedAt: "2024-06-16T04:02:33Z",
  //       content:
  //         "David Wiese acknowledged the crowd as he walked off after being dismissed against England  •  ICC/Getty Images",
  //     },
  //     {
  //       source: {
  //         id: "google-news",
  //         name: "Google News",
  //       },
  //       author: "Hindustan Times",
  //       title:
  //         "Rahul Dravid surprises Canada by entering dressing room after washout, touched by 'memorable' gesture in India swansong - Hindustan Times",
  //       description: null,
  //       url: "https://news.google.com/rss/articles/CBMiswFodHRwczovL3d3dy5oaW5kdXN0YW50aW1lcy5jb20vY3JpY2tldC90MjAtd29ybGQtY3VwLXJhaHVsLWRyYXZpZC1zdXJwcmlzZXMtY2FuYWRhLWVudGVycy1kcmVzc2luZy1yb29tLXdhc2hvdXQtdG91Y2hlZC1ieS1tZW1vcmFibGUtZ2VzdHVyZS1pbi1pbmRpYS1zd2Fuc29uZy0xMDE3MTg1MDgzODI0MTguaHRtbNIBtwFodHRwczovL3d3dy5oaW5kdXN0YW50aW1lcy5jb20vY3JpY2tldC90MjAtd29ybGQtY3VwLXJhaHVsLWRyYXZpZC1zdXJwcmlzZXMtY2FuYWRhLWVudGVycy1kcmVzc2luZy1yb29tLXdhc2hvdXQtdG91Y2hlZC1ieS1tZW1vcmFibGUtZ2VzdHVyZS1pbi1pbmRpYS1zd2Fuc29uZy0xMDE3MTg1MDgzODI0MTgtYW1wLmh0bWw?oc=5",
  //       urlToImage: null,
  //       publishedAt: "2024-06-16T03:59:06Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "NDTV News",
  //       },
  //       author: "NDTV Sports Desk",
  //       title:
  //         '"Kids Born During Covid Have No Idea...": Shahid Afridi Loses Cool Discussing T20 World Cup Capitula.. - NDTV Sports',
  //       description:
  //         "Afridi pinpointed poor performances and bad captaincy as the reasons for Pakistan's failure at the 2024 T20 World Cup.",
  //       url: "https://sports.ndtv.com/t20-world-cup-2024/kids-born-during-covid-have-no-idea-pakistan-great-loses-cool-discussing-t20-world-cup-capitulation-5896844",
  //       urlToImage:
  //         "https://c.ndtvimg.com/2023-11/80m8len8_shahid-afridi-babar-azam-instagram-afp_625x300_14_November_23.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=675",
  //       publishedAt: "2024-06-16T03:51:53Z",
  //       content:
  //         'Denying rumours of groupism within the Pakistan camp, former captain Shahid Afridi labelled newer fans on social media as having "born during Covid times". After Pakistan\'s early exit from the 2024 T… [+1668 chars]',
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Cricket.one",
  //       },
  //       author: "Anurag Dasgupta",
  //       title:
  //         "[Watch] George Munsey Brings Out 'Warner Style' Switch-Hit To Stun Maxwell - OneCricket",
  //       description:
  //         "He contributed 35 off 23 deliveries, and the highlight of his knock was the switch-hit to smack Glenn Maxwell, which reminded fans of David Warner.",
  //       url: "https://cricket.one/match-hub/watch-george-munsey-brings-out-warner-style-switch-hit-to-stun-maxwell/666e5530fdc09c66a532c5d8",
  //       urlToImage:
  //         "https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1718504674571_Screenshot 2024-06-16 at 7.54.18 AM.jpg",
  //       publishedAt: "2024-06-16T03:00:00Z",
  //       content:
  //         "Munsey with a switch-hit off Maxwell [X]\r\nScottish opener, George Munsey continued his dream T20 World Cup 2024 as he batted with grace and power to stun Australia in the ongoing contest.\r\nDespite lo… [+976 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "The Tribune India",
  //       },
  //       author: "The Tribune India",
  //       title:
  //         "T20 World Cup: Shubman Gill sent back home due to 'disciplinary issue'? Here is what the Indian team coach has to say - The Tribune India",
  //       description: null,
  //       url: "https://www.tribuneindia.com/news/trending/t20-world-cup-shubman-gill-sent-back-home-due-to-disciplinary-issue-here-is-what-the-indian-team-coach-has-to-say-631389",
  //       urlToImage: null,
  //       publishedAt: "2024-06-16T02:55:55Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Livemint",
  //       },
  //       author: "Livemint",
  //       title:
  //         "Wasim Akram wants Babar Azam's side sacked after Pakistan's T20 World Cup disqualification:'Keep the coaches and…' | Mint - Mint",
  //       description:
  //         "Former Pakistan skipper Wasim Akram has suggested that PCB should fire the entire Pakistan cricket team led by skipper Babar Azam while retaining the coaching staff.",
  //       url: "https://www.livemint.com/sports/cricket-news/wasim-akram-wants-babar-azams-side-sacked-after-pakistans-t20-world-cup-disqualification-keep-the-coaches-and-11718502520859.html",
  //       urlToImage:
  //         "https://www.livemint.com/lm-img/img/2024/06/16/1600x900/Wasim_Akram_1699597880048_1718505995313.png",
  //       publishedAt: "2024-06-16T02:52:42Z",
  //       content:
  //         "Pakistan cricket team have a poor outing at this year's T20 World Cup after losing back to back matches against USA and India, leading to their disqualification from the Super 8 stage of the tourname… [+2372 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "NDTV News",
  //       },
  //       author: "NDTV Sports Desk",
  //       title:
  //         '"This Phobia Must End...": Ex-PCB Chief\'s Blunt Assessment Of Babar Azam, Mohammad Rizwan - NDTV Sports',
  //       description:
  //         "With the opening combination of Babar Azam and Mohammad Rizwan, Pakistan made it to the final of T20 World Cup 2022, where they lost to England by 5 wickets",
  //       url: "https://sports.ndtv.com/t20-world-cup-2024/this-phobia-must-end-ex-pcb-chiefs-blunt-assessment-of-babar-azam-mohammad-rizwan-5883987",
  //       urlToImage:
  //         "https://c.ndtvimg.com/2022-11/lh5bdfb8_babar-azam-mohammad-rizwan-afp_625x300_13_November_22.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675",
  //       publishedAt: "2024-06-16T02:46:09Z",
  //       content:
  //         "Pakistani cricketer-turned-commentator Ramiz Raja has backed the duo of Babar Azam and Mohammad Rizwan as the openers of the national team. Reacting to Shahid Afridi's opinion of Fakhar Zaman opening… [+1611 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "ESPN India",
  //       },
  //       author: "ESPN staff",
  //       title:
  //         "Euro 2024: Yamal the youngest, Carvajal the oldest, Albania the fastest - ESPN India",
  //       description:
  //         "ESPN brings you the best stats from the Euro 2024 action on June 15.",
  //       url: "https://www.espn.in/football/story/_/id/40357033/euro-2024-stats-yamal-youngest-carvajal-oldest-albania-fastest",
  //       urlToImage:
  //         "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0615%2Fr1346186_1296x729_16%2D9.jpg",
  //       publishedAt: "2024-06-16T02:25:00Z",
  //       content:
  //         "A statement victory for the former champions against a team that always punch above their weight headlined the Euro 2024 action on Saturday June 15, as Spain and Switzerland got their campaigns off t… [+3002 chars]",
  //     },
  //   ],
  // };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
        if (selectedFilter) {
          url += `&category=${selectedFilter.toLowerCase()}`;
        }
        const response = await axios.get(url);
        const fetchedArticles = response.data.articles;
        const filteredArticles = fetchedArticles.filter(
          (article) => article.urlToImage // Filter out articles without an image
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [selectedFilter]);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // pegination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const shortDescription = (description) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return description;
  };
  return (
    <>
      <div className="w-1/3 mt-4 mx-4">
        {/* <FormControl fullWidth>
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedFilter}
            onChange={handleChange}
            label="Select Category"
          >
            <MenuItem value="">All</MenuItem>
            {categoriesArray.map((category, index) => (
              <MenuItem key={index} value={category.toLowerCase()}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </div>
      <div className="p-5 grid grid-cols-4 gap-4">
        {currentArticles.map((article, index) => (
          <div
            key={index}
            className="mx-auto rounded-lg overflow-hidden mb-5 shadow-xl"
          >
            <img
              className="w-full h-48 object-cover"
              src={article?.urlToImage}
              alt={article?.title}
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {article.title}
              </h2>
              <p className="text-sm text-gray-700 bg-gray-100 p-4">
                {shortDescription(article.description)}
              </p>
              <p className="text-gray-500 my-2 font-semibold">
                By {article?.author}
              </p>
              <a href={article?.url}>Read More</a>
            </div>
          </div>
        ))}

        {/* Pagination section */}
        <div>
          <Pagination
            count={Math.ceil(articles.length / articlesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

export default Articles;
