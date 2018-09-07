(function ($, window) {
  'use strict'

  var pluginName = 'auto-complete'
  var isSending = false
  var loadResult = function (el, options) {
    var key = el.input.val()
    if (isSending || key === '') {
      return
    }
    isSending = true
    $.ajax({
      url:
        '/search?q=filter=((collectionid:product>=0)&&(title:product**' +
        key +
        '))&view=' +
        options.view,
      success: function (data) {
        el.list.html(data).show()

        isSending = false
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(thrownError)
        isSending = false
      }
    })
  }

  function Plugin (element, options) {
    this.element = $(element)
    this.options = $.extend(
      {},
      $.fn[pluginName].defaults,
      this.element.data(),
      options
    )

    this.input = this.element.find('input[name=q]')
    this.list = this.element.find('[auto-complete-res]')
    this.timeout = null
    this.init()
  }

  Plugin.prototype = {
    init: function () {
      var that = this
      var options = this.options

      that.input.on(options.event, function (event) {
        if (event.keyCode === 38 || event.keyCode === 40) {
          return that.select(event.keyCode)
        } else {
          clearTimeout(that.timeout)
          that.timeout = setTimeout(function () {
            loadResult(that, options)
          }, options.delay)
        }
      })
      that.input.blur(function () {
        that.list.slideUp()
      })
    },
    select: function (act) {
      var results = this.list.find('li')
      var current = this.list.find('.active').index()
      var length = results.length
      if (act === 38) {
        if (current === -1 || current === 0) {
          current = length - 1
        } else {
          current = current - 1
        }
      }
      if (act === 40) {
        if (current === -1 || current === length - 1) {
          current = 0
        } else {
          current = current + 1
        }
      }

      results.removeClass('active')
      results.eq(current).addClass('active')
      this.input.val(results.eq(current).data('title'))
      return false
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName)
    }
  }

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName)
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options))
      } else if (instance[options]) {
        instance[options](params)
      }
    })
  }

  $.fn[pluginName].defaults = {
    event: 'keyup',
    delay: 500,
    view: 'auto'
  }

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]()
  })
})(jQuery, window)
