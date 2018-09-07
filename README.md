# hrv-autocomplete

Plugin search auto complete for haravan

**insert file hrv.autocomplete.min.js before close body tag**

```sh
{{ 'hrv.autocomplete.min.js' | asset_url | script_tag }}
```

**Create file search.auto.liquid**

```sh
{% layout none %}
<ul>
	{% for product in search.results limit: 7 %}
	<li data-title="{{product.title}}">
		<a title="{{product.title}}" href="{{product.url}}">
			<img alt="{{product.handle}}" src="{{ product.featured_image | img_url: 'thumb' }}">
			{{product.title}}
			<span class="price-search">{{product.price | money}}</span>
		</a>
	</li>
	{% endfor %}
</ul>
```

**Create form search**

```sh
<form data-awesome-search class="" action="/search">
	<input type="hidden" name="type" value="product">
	<input type="text" name="q" required class="" value="" placeholder="Tìm kiếm">
	<button><i class="fa fa-search"></i></button>
  <div auto-complete-res class=""></div>
</form>
```

**done**
