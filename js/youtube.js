const API_KEY = (document.getElementsByName("youtube").length > 0 && document.getElementsByName("youtube")[0].getAttribute("api-key")) || 0;

const channel_id = (document.getElementsByName("youtube").length > 0 && document.getElementsByName("youtube")[0].getAttribute("channel-id")) || 0;
const videos_lenght = (document.getElementsByName("youtube").length > 0 && document.getElementsByName("youtube")[0].getAttribute("lenght")) || 0;

const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&part=id,snippet,contentDetails&playlistId=${channel_id}&maxResults=${videos_lenght}`;

const MY_VIDEOS = [
  {
    id: 1,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
  {
    id: 2,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
  {
    id: 3,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
  {
    id: 4,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
  {
    id: 5,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
  {
    id: 6,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
  {
    id: 7,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
  {
    id: 8,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
  {
    id: 9,
    title: "Youtube video",
    description: "Youtube video",
    url: "https://www.youtube.com",
    thumbnail: "https://assets.website-files.com/5f287c509db7355a9352ca81/5f33ec97d57872e3f5c5f448_Team-4-p-1080.jpeg",
    publishAt: "2021-01-01",
  },
];

let app = new Vue({
  el: "#appVideo",
  data() {
    return {
      loading: false,
      videos: [...MY_VIDEOS],
    };
  },
  created() {
    fetch(YOUTUBE_API)
      .then((data) => {
        return data.json();
      })
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
