import './App.css';
import React, { useState } from 'react'; // useState를 임포트

function App() {
  const [posts, setPosts] = useState([
    {
      title: '강남역',
      date: '2024/07/01',
      likeCount: 0,
      content: '강남역 다녀왔어요',
    },
    {
      title: '회현역',
      date: '2024/07/02',
      likeCount: 0,
      content: '회현역 다녀왔어요',
    },
    {
      title: '고디역',
      date: '2024/07/03',
      likeCount: 0,
      content: '고디역 다녀왔어요',
    },
  ]);

  const [state, setState] = useState({
    isPostModal: false,
    postModalIndex: null,
    isWriteModal: false,
  });

  const openPostModal = (i) => {
    const copiedState = { ...state };
    copiedState.postModalIndex = i;
    copiedState.isPostModal = true;
    setState(copiedState);
  };

  const openWriteModal = (i) => {
    const copiedState = { ...state };
    copiedState.isWriteModal = true;
    setState(copiedState);
  };

  const clickLike = (i) => {
    const copiedPosts = [...posts];
    copiedPosts[i].likeCount++;
    setPosts(copiedPosts);
  };

  const deletePost = (i) => {
    const copiedPosts = [...posts];
    copiedPosts.splice(i, 1);
    setPosts(copiedPosts);
  };

  return (
    <div className="App">
      {state.isWriteModal ? (
        <WriteModal
          state={state}
          posts={posts}
          setState={setState}
          setPosts={setPosts}
        />
      ) : null}
      {state.isPostModal ? (
        <PostModal
          state={state}
          posts={posts}
          setState={setState}
          setPosts={setPosts}
        />
      ) : null}

      <nav className="nav-top">
        <p>무찌 앱</p>
        <p>#######</p>
      </nav>
      <div className="lists">
        {posts.map((list, i) => {
          return (
            <div
              className="list"
              key={i}
              onClick={() => {
                openPostModal(i);
              }}
            >
              <h4>{list.title}</h4>
              <p className="date">{list.date}</p>
              <p
                className="likeBtn"
                onClick={(event) => {
                  event.stopPropagation();
                  clickLike(i);
                }}
              >
                따봉
              </p>
              <p>{list.likeCount}</p>
              <p
                className="deleteBtn"
                onClick={(event) => {
                  event.stopPropagation();
                  deletePost(i);
                }}
              >
                삭제
              </p>
            </div>
          );
        })}
      </div>
      <div className="appBtn">
        <p className="writeBtn" onClick={openWriteModal}>
          글쓰기
        </p>
      </div>
    </div>
  );
}

const PostModal = ({ posts, state, setState, setPosts }) => {
  const closeModal = () => {
    const copiedState = { ...state };
    copiedState.isPostModal = false;
    setState(copiedState);
  };

  const edit = () => {
    const copiedPosts = [...posts];
    const editedContent = prompt(
      '새로운 글내용',
      copiedPosts[state.postModalIndex].content,
    );
    if (editedContent) {
      copiedPosts[state.postModalIndex].content = editedContent;
      setPosts(copiedPosts);
    }
  };
  return (
    <div className="detailPost-back">
      <div className="detailPost">
        <div className="title">
          <h4>{posts[state.postModalIndex].title}</h4>
          <p>{posts[state.postModalIndex].date}</p>
        </div>
        <div className="inner-back">
          <div className="inner-front">
            <p>{posts[state.postModalIndex].content}</p>
          </div>
        </div>
        <div className="btn-box">
          <p className="btn" onClick={edit}>
            수정
          </p>
          <p className="btn" onClick={closeModal}>
            닫기
          </p>
        </div>
      </div>
    </div>
  );
};

const WriteModal = ({ posts, state, setState, setPosts }) => {
  const closeModal = () => {
    const copiedState = { ...state };
    copiedState.isWriteModal = false;
    setState(copiedState);
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const getCurrentDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  };

  const write = () => {
    const copiedPosts = [...posts];
    const newPost = {};
    newPost.title = title;
    newPost.content = content;
    newPost.date = getCurrentDate();
    newPost.likeCount = 0;
    copiedPosts.unshift(newPost);
    if (newPost.title) {
      setPosts(copiedPosts);
      closeModal();
    } else {
      closeModal();
    }
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="write-back">
      {title}
      <div className="detailPost">
        <div className="title">
          <input type="text" onChange={handleTitle} />
        </div>
        <div className="inner-back">
          <div className="inner-front">
            <textarea onChange={handleContent}></textarea>
          </div>
        </div>
        <div className="btn-box">
          <p className="btn" onClick={write}>
            확인
          </p>
          <p className="btn" onClick={closeModal}>
            닫기
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
