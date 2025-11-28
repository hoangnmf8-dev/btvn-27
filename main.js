//Bài 1
let startTime;
let endTime;

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("User Data"), 2000);
  });
}
function fetchPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Post Data"), 3000);
  });
}
function fetchComments() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Comment Data"), 1000);
  });
}

const arr = [fetchUser(), fetchPosts(), fetchComments()];
startTime = new Date();

Promise.all(arr).then((data) => {
  console.log("Bài 1: ");
  //có reject thì gọi thêm catch
  console.log(data);
  endTime = new Date();
  console.log(
    `Thời gian chạy của các promise là: ${(endTime - startTime) / 1000}s`
  );
});

//Bài 2
function fetchFromServer1() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 1 Response"), 3000)
  );
}
function fetchFromServer2() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 2 Response"), 2000)
  );
}
function fetchFromServer3() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 3 Response"), 1000)
  );
}
const arr1 = [fetchFromServer1(), fetchFromServer2(), fetchFromServer3()];
Promise.race(arr1).then((data) => {
  console.log("Bài 2:");
  console.log(data);
});

//Bài 3
function retry(fn, times) {
  console.log("Bài 3:");
  return fn()
    .then((data) => data)
    .catch((error) => {
      times--;
      if (times >= 0) {
        //Sau khi thất bại thì được chạy lại tối đa times lần
        return retry(fn, times);
      } else {
        return error;
      }
    });
}
let failingPromise = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("Thành công") : reject("Thất bại");
  });
};

retry(failingPromise, 3)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
