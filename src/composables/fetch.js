import { ref, onMounted } from "vue";
import { toast } from "vue-sonner";

export function useFetch(url, method = "GET", token) {
	const data = ref(null);
	const loading = ref(false);

	const fetchData = async () => {
		try {
			loading.value = true;
			const response = await fetch(url, {
				method: method,
				headers: {
					token: token,
				},
			});
			const result = await response.json();
			data.value = result;
		} catch (err) {
			toast.error(err.message);
		} finally {
			loading.value = false;
		}
	};

	onMounted(() => {
		fetchData();
	});

	return {
		data,
		loading,
		fetchData,
	};
}
