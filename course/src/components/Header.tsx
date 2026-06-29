interface courseNameProps {
  courseName: string;
}

const Header = (props: courseNameProps) => {
  return <h1>{props.courseName}</h1>;
};

export default Header;
