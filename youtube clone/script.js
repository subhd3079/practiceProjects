// AIzaSyDbeiGJr4Y1aIU0tWlylGZTqGHZhOO5Dgg


const form = document.querySelector("form");
const filterType = document.querySelector("#type");

const appendData = (data) => {
  document.querySelector(".search-container").innerHTML = "";
  document.querySelector(".video-container").innerHTML = "";
  data.forEach(
    ({ snippet: { thumbnails, title, channelTitle }, id }) => {
      const videoImage = document.createElement("img");
      const videoTitle = document.createElement("h5");
      const channelName = document.createElement("p");
      const div = document.createElement("div");

      videoImage.src = thumbnails.medium.url;
      videoTitle.innerText = title;
      channelName.innerText = channelTitle;

      div.addEventListener("click", () => {
        if (typeof id === 'string') appendVideo(title, channelTitle, id);
        else if (typeof id === 'object') appendVideo(title, channelTitle, id.videoId);
      });

      div.append(videoImage, videoTitle, channelName);
      document.querySelector(".search-container").append(div);
    }
  );
};

// fetch by search
const fetchSearch = async (input) => {
  

  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${input}&key=AIzaSyDbeiGJr4Y1aIU0tWlylGZTqGHZhOO5Dgg`
  );

  const data = await res.json();

  appendData(data.items);
};

// click on search button
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = form.input.value;

  fetchSearch(input);
});

// change on select option
filterType.addEventListener('change', () => {

  const input = filterType.value;
  fetchSearch(input);
})


// click on logo
document.querySelector(".logo > img").addEventListener("click", () => {
  window.location.href = "index.html";
});

// click on video
const appendVideo = (title, channelTitle, videoId) => {
  document.querySelector(".search-container").innerHTML = "";
  document.querySelector(".video-container").innerHTML = "";
  


  const videoFrame = document.createElement('iframe')
  const videoTitle = document.createElement('h3')
  const channelName = document.createElement('p')

  videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
  videoFrame.width = '560'
  videoFrame.height = '315'
  videoFrame.allow = 'autoplay'
  videoTitle.innerText = title
  channelName.innerText = channelTitle

  document.querySelector(".video-container").append(videoFrame, videoTitle, channelName)
};


// trending default
const fetchTrending = async () => {
  const res = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyDbeiGJr4Y1aIU0tWlylGZTqGHZhOO5Dgg')
  const data = await res.json()

  appendData(data.items)
}
fetchTrending()