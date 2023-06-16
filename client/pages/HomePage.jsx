import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

export default function HomePage({ isLoggedIn }) {
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		document.title = 'Home'
		fetch('/api/get-blogs', {
			method: 'GET'
		}).then(res => res.json())
			.then(data => {
				setBlogs(data.blogs)
			})
	}, [])
	return (
		<>
			<div className="home-page py-5">
				<div className="container">
					<div className="row gy-5">
						<BlogCard blogs={blogs} />
					</div>
				</div>
			</div>
		</>
	)
}