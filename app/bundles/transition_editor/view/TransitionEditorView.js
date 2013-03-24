define(['libs/backbone',
		'bundles/slide_snapshot/TransitionSlideSnapshot',
		'css!styles/transition_editor/slideTable.css'],
function(Backbone, TransitionSlideSnapshot, empty) {
	'use strict';

	return Backbone.View.extend({
		className: 'slideTable',

		/*
		TODO: render the slides...
		The button bar will need to be taken care of
		through something else...
		Register button bars with a given mode?

		strut.TransitionButtonProviders??

		My model is a TransitionEditorModel
		which contains a reference to the editorModel
		and registry.
		*/

		initialize: function() {
			this._snapshots = [];
		},

		render: function() {
			console.log('Rendering transition editor');
			this.$el.html('');
			var deck = this.model.deck();

			var colCnt = 6;
			var cnt = 0;
			deck.get('slides').forEach(function(slide) {
				console.log(this);
				var x = slide.get('x');

				if (x == null) {
					slide.set('x', cnt * 160 + 30);
					slide.set('y', ((cnt / colCnt) | 0) * 160 + 80);
				}
				++cnt;

				var snapshot = new TransitionSlideSnapshot({model: slide,
					registry: this.model.registry});
				this._snapshots.push(snapshot);
				this.$el.append(snapshot.render().$el);
			}, this);

			return this;
		},

		constructor: function TransitionEditorView() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});