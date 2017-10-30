module.exports = {
	props: {
		data: {
			type: Object,
			default: function() {
				return {
					current_page: 1,
					data: [],
					from: 1,
					last_page: 1,
					next_page_url: null,
					per_page: 10,
					prev_page_url: null,
					to: 1,
					total: 0,
				}
			}
		},
		limit: {
			type: Number,
			default: 0
		},
        position: {
			type: String,
			default: ''
		}
	},

	template: '<ul class="pagination" :class="align" v-if="data.total > data.per_page">\
		<li class="page-item" :class="{ disabled: data.prev_page_url }">\
			<a class="page-link" href="#" aria-label="Previous" @click.prevent="selectPage(--data.current_page)"><span aria-hidden="true">Previous</span></a>\
		</li>\
		<li class="page-item" v-for="n in getPages()" :class="{ \'active\': n == data.current_page }"><a class="page-link" href="#" @click.prevent="selectPage(n)">{{ n }}</a></li>\
		<li class="page-item" :class="{ disabled: data.next_page_url }">\
			<a class="page-link" href="#" aria-label="Next" @click.prevent="selectPage(++data.current_page)"><span aria-hidden="true">Next</span></a>\
		</li>\
	</ul>',

	computed: {
		align () {
			if (this.position === 'center') {
				return 'justify-content-center'
			} else if (this.position === 'right') {
                return 'justify-content-end'
            } else {
				return;
			}
        }
	},

	methods: {
		selectPage: function(page) {
			this.$emit('pagination-change-page', page);
		},
		getPages: function() {
			if (this.limit === -1) {
				return 0;
			}

			if (this.limit === 0) {
				return this.data.last_page;
			}

        	var start = this.data.current_page - this.limit,
        	    end   = this.data.current_page + this.limit + 1,
        	    pages = [],
        	    index;

        	start = start < 1 ? 1 : start;
        	end   = end >= this.data.last_page ? this.data.last_page + 1 : end;

        	for (index = start; index < end; index++) {
        		pages.push(index);
        	}

        	return pages;
		}
	}
};
