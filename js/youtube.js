/*!
 * youtube.js v1.0.3
 * (c) 2021-2022 Lazzo
 * (a) Raul Rueda
 * Released under the MIT License.
 */

const API_KEY = (document.getElementsByName("youtube").length > 0 && document.getElementsByName("youtube")[0].getAttribute("api-key")) || "";

const channel_id = (document.getElementsByName("youtube").length > 0 && document.getElementsByName("youtube")[0].getAttribute("channel-id")) || "";
const videos_lenght = (document.getElementsByName("youtube").length > 0 && document.getElementsByName("youtube")[0].getAttribute("lenght")) || 0;

const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&part=id,snippet,contentDetails&playlistId=${channel_id}&maxResults=${videos_lenght}`;

const MY_VIDEOS = [
  {
    id: 1,
    title: "Youtube video",
    description: "Lazzo CDN: Youtube video script for dynamic content sync with your channel",
    url: "https://www.youtube.com",
    thumbnail: "https://storage.googleapis.com/ctag-logos-mailer/website/lazzo_io_og.jpg",
    publishAt: "2000-01-01",
  },
];

let app = new Vue({
  el: "#appVideo",
  data() {
    return {
      loading: false,
      videos: [],
    };
  },
  created() {
    axios
      .get(YOUTUBE_API)
      .then((response) => {
        return response.data.items.map((video) => {
          let video_date = new Date(video.contentDetails.videoPublishedAt);

          return {
            id: video.id,
            title: video.snippet.title !== "" ? `${video.snippet.title.substr(0, 55).trim()}` : "",
            description: video.snippet.description !== "" ? `${video.snippet.description.substr(0, 90).trim()}...` : "",
            url: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
            thumbnail: video.snippet.thumbnails.medium.url,
            publishAt: !isNaN(video_date.getDate()) ? `${video_date.getDate()}/${video_date.getMonth() + 1}/${video_date.getFullYear()}` : " - ",
          };
        });
      })
      .then((res) => {
        this.videos = res;
        this.loading = false;
      })
      .catch((e) => console.log("ERROR API : ", e));
  },
  mounted() {},
  methods: {},
});
