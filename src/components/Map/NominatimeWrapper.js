
import XHR from '../../helpers/XHRClient';

/**
 * Class parameters
 * @param {* The base url called as API provider} baseUrl 
 * @param {* The full url builded with options} fullUrl 
 * @param {* The query to be performed in case of simple call} query 
 * @param {* The queries to perform in case of multiple calls} queries 
 */
class NominatimeWrapper {

    /**
     * Constructor parameters
     * @param {* Can be either a String or an Array of POI} amenities 
     * @param {* Set of options to run the API call} options 
     */
    constructor(amenities = [], options) {
        this.baseUrl = 'http://nominatim.openstreetmap.org/search.php?';
        this._buildOptions(options);

        if (amenities instanceof Array) {
            this._queryMultiple(amenities);
        }
        else if (typeof amenities === 'string') {
            this._queryOnce(amenities);
        } else {
            throw new Error('Amenities must be instance of Array or typeof string');
        }
    }

    /**
     * 
     * @param {* A simple POI as a String} query 
     */
    _queryOnce(query) {
        if (query.length > 0) {
            this.query = this.fullUrl + query;
            return true;
        }

        throw new Error('The query parameters mustn\'t be empty');
    }

    /**
     * 
     * @param {* An Array containing a set of POI} queries 
     */
    _queryMultiple(queries) {
        this.queries = [];
        this.queries = queries.map((query, index) => {
            return this.fullUrl + '&q=' + query;
        });
    }

    _buildOptions(options) {
        if (!options || Object.keys(options).length == 0) {
            throw new Error('options can\'t be null or empty otherwise the request will fail');
        }

        this.baseUrl += options.format || 'format=jsonv2';
        this.fullUrl = this.baseUrl;

        delete options.format;
        delete options.q;

        for (var option in options) {
            this.fullUrl += '&' + option.toString() + '=' + options[option].toString();
        }
    }

    _xhr(url) {
        return XHR.get(url, {}).then((response) => {
            if (response instanceof Array) {
                for (let i = 0; i < response.length; i++)
                    response[i].display_name = response[i].display_name.split(',');

                return response;
            }

            return { error: response };
        }).catch(e => {
            return { error: e };
        });
    }

    async Run() {
        if (this.query) {
            return await this._xhr(this.query);
        }

        const responses = [];
        for (let i = 0; i < this.queries.length; i++) {
            responses.push(await this._xhr(this.queries[i]));
        }
        return responses;
    }

    RunWithBounds(bounds) {
        if (!bounds || Object.keys(bounds).length === 0) {
            throw new Error('Bounds must not be empty');
            return;
        }
        const { _ne, _sw } = bounds;
        const boundString = '&viewbox=' + _ne.lng + ',' + _ne.lat + ',' + _sw.lng + ',' + _sw.lat + '&bounded=1';
        (this.query) ? (this.query += boundString) : this.queries = this.queries.map((query, i) => {
            return query += boundString;
        });

        return this.Run();
    }
}

export default NominatimeWrapper;