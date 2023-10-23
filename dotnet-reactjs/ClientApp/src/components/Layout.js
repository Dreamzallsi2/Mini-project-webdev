import React from 'react';

const Header = () => (
  <header>
    <h1>เว็บไซต์ของเรา</h1>
    <nav>
      {/* เพิ่มลิงก์ไปยังหน้าอื่น ๆ ที่คุณต้องการ */}
      <a href="/">หน้าหลัก</a>
      <a href="/about">เกี่ยวกับเรา</a>
      <a href="/contact">ติดต่อเรา</a>
    </nav>
  </header>
);

const Footer = () => (
  <footer>
    <p>&copy; ปีปัจจุบัน เว็บไซต์ของเรา</p>
  </footer>
);

const Layout = ({ children }) => (
  <div>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
