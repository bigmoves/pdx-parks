/** @jsx React.DOM */

var React = require('react');

var Link = React.createClass({

  render: function() {
    var isActive = this.props.isActive ? 'active' : '';
    return (
      <li key={this.props.page} className={isActive}>
        <a href={this.props.href}>{this.props.page}</a>
      </li>
    );
  }
});

var Pagination = React.createClass({

  render: function() {
    var offset = 10;
    var currentPage = +this.props.page || 1;
    var firstPage = 1;
    var lastPage = Math.ceil(this.props.count / offset);
    var query = this.props.query;
    var filter = this.props.filter;
    var links = [];

    if (currentPage >= 9) {
      links.push(<li><a href={href(query, filter, 1)}>1</a></li>);
      links.push(<li><a href={href(query, filter, 2)}>2</a></li>);
      links.push(<li><a href="#">...</a></li>);
    }

    var start = (currentPage < 9 ? firstPage : currentPage - 4);
    var end = (currentPage < 9 ? firstPage + 9 : currentPage + 5);

    if (currentPage > 9 && (currentPage > (lastPage - 9))) {
      start = lastPage - 9;
      end = lastPage + 1;
    }

    for (var i = start; i < end; i++) {
      var isActive = (i === currentPage);
      if (i <= lastPage) {
        links.push(
          <Link page={i} href={href(query, filter, i)} isActive={isActive} />
        );
      }
    }

    if (lastPage > 9 && currentPage <= (lastPage - 9)) {
      links.push(<li><a href="#">...</a></li>);
      links.push(<li><a href={href(query, filter, lastPage - 1)}>{lastPage - 1}</a></li>);
      links.push(<li><a href={href(query, filter, lastPage)}>{lastPage}</a></li>);
    }

    function isDisabled(link) {
      if (link === 'prev')
        return currentPage === firstPage;
      if (link === 'next')
        return currentPage === lastPage;
    }

    if (this.props.count <= 10)
      return <div />

    return (
      <ul className="pagination">
        <li className={isDisabled('prev') ? 'disabled' : ''}>
          <a href={href(query, filter, currentPage - 1)}>&laquo;</a>
        </li>
        {links}
        <li className={isDisabled('next') ? 'disabled' : ''}>
          <a href={href(query, filter, currentPage + 1)}>&raquo;</a>
        </li>
      </ul>
    );
  }
});

function href(query, filter, page) {
  var filterParam = (filter ? '&f='+filter : '');
  return 'search?q='+query+'&p='+page+filterParam;
}

module.exports = Pagination;
