import { h, Component } from 'preact'
import Button from 'material-ui/Button'
import Card from 'src/components/card/'

export default class Pagination extends Component {

    changePage(page) {
        this.props.onPageChange(page)
    }

    render({ page, totalPages, }) {
        let prevDisabled = page <= 1
        let nextDisabled = page >= totalPages
        let prevPage = page - 1
        let nextPage = page + 1

        return (
            <Card>
                <div class="d-flex justify-content-between align-items-center">
                    <Button
                        disabled={prevDisabled}
                        color="primary"
                        onClick={this.changePage.bind(this, prevPage)}
                    >
                        <i className="zmdi zmdi-chevron-left mr-1" />
                        Previous
                    </Button>

                    <div>
                        Page {page} of {totalPages}
                    </div>

                    <Button
                        disabled={nextDisabled}
                        color="primary"
                        onClick={this.changePage.bind(this, nextPage)}
                    >
                        Next
                        <i className="zmdi zmdi-chevron-right ml-1" />
                    </Button>
                </div>
            </Card>
        )
    }

}
