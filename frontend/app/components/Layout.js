// app/components/Layout.js
const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Welcome to Our E-commerce Store</h1>
      </header>
      <main>{children}</main>
      <footer>Footer Content</footer>
    </div>
  );
};

export default Layout;
