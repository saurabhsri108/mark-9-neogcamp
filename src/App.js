import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [books, setBooks] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("fantasy");

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch("./books.json", {
        headers: {
          "Content-type": "application/json",
          Accepts: "application/json"
        }
      });
      const { books } = await response.json();
      setBooks(books);
      setTags(Object.keys(books));
    };
    getBooks();
  }, []);

  const changeGenre = (tag) => {
    setCurrentGenre(tag);
  };

  return (
    <div className="App">
      <h1 className="heading">Goodbooks Project</h1>
      <div className="tags">
        {tags &&
          tags.map((tag, index) => {
            return (
              <span
                className="tag"
                key={index}
                onClick={() => changeGenre(tag)}
              >
                {tag}
              </span>
            );
          })}
      </div>
      <div className="books">
        <ul className="lists">
          {books &&
            books[currentGenre].map((book, index) => {
              return (
                <li className="list-item" key={index}>
                  <img
                    src={book.image}
                    alt={book.name}
                    width="96"
                    height="auto"
                  />
                  <div className="content">
                    <h2>{book.name}</h2>
                    <p>Rating: {book.rating}/5</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
