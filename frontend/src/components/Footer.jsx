function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} OB1 Sandbox. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
