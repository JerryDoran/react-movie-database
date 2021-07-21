import { useState, useEffect } from 'react';
import API from '../api';

export const useSingleMovieFetch = (movieId) => {
	const [state, setState] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchMovieData = async () => {
			try {
				setLoading(true);
				setError(false);

				const movie = await API.fetchMovie(movieId);
				const credits = await API.fetchCredits(movieId);

				// get directors
				const directors = credits.crew.filter(
					(member) => member.job === 'Director',
				);

				setState({
					...movie,
					actors: credits.cast,
					directors,
				});

				setLoading(false);
			} catch (error) {
				setError(true);
			}
		};

		fetchMovieData();
	}, [movieId]);

	return { state, loading, error };
};
