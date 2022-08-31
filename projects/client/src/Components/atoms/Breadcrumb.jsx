import { Typography, Breadcrumbs, Link } from "@mui/material";

export default function BasicBreadcrumbs(props) {
    const { prevLinks, currentLink } = props
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {prevLinks ?
                prevLinks.map((value, index) => {
                    return <Link key={value.id} underline="hover" color="inherit" href={value.href}>{value.link}</Link>
                })
                : null}
            <Typography color="text.primary">{currentLink}</Typography>
        </Breadcrumbs>
    );
}