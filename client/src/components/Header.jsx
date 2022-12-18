import HeroLayout from "./HeroLayout";
import Typography from "../components/mui-components/Typography";

const Header = ({ img, text, height }) => {

    return (
        <HeroLayout
        sxBackground={{
          backgroundImage: `url(${img})`,
          backgroundPosition: 'center',
          height:{height}
        }}
        >

            <Typography color="inherit" align="center" variant="h2">
            {text}
            </Typography>

        </HeroLayout>
    );
}
 
export default Header;