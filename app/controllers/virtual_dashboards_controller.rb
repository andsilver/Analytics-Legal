class VirtualDashboardsController < ApplicationController

  def one
    @data = perform_elasticsearch 'text'
  end

  def two
    @query = File.read("public/virtualdashboard-queries/2.json")
    @data = perform_elasticsearch @query
  end

  def three
  end

  def four
  end

  def five
  end

  def six
  end

  def seven
  end

  def eight
  end

  private
  def perform_elasticsearch( query )

    baseUrl = "http://35.237.222.159:9200"

    client = Elasticsearch::Client.new log: true, host: baseUrl
    client.cluster.health

    result = client.search body: query

  end
end
