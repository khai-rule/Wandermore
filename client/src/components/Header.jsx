import HeroLayout from "./HeroLayout";
import Typography from "../components/mui-components/Typography";
import Link from "@mui/material/Link";

const Header = ({ img, text, height, link, linkText }) => {

    return (
        <HeroLayout
        sxBackground={{
          backgroundImage: `url(${img})`,
          backgroundPosition: 'center',
          height:{height}
        }}
        >

            <Typography color="inherit" align="center" variant="h2" padding="4px 0">
                {text}
            </Typography>

            <Link variant="subtitle1" color="inherit" href={link} padding="4px 0">
                {linkText}
            </Link>

        </HeroLayout>
    );
}
 
export default Header;