class Cases::CobranzasController < ApplicationController
    def my_cases
    end

    def elasticsearch
        result = perform_elasticsearch( params[:start], params[:length] )
        source = result['hits']['hits']
        # source.sort!{ |a, b|  a["_source"]["foram_inicio"] <=> b["_source"]["foram_inicio"]}

        response = {
            :draw => params[:draw],
            :recordsTotal => result["hits"]["total"],
            :recordsFiltered => result["hits"]["total"],
            :data => !result["hits"]["total"] ? [] : source.map { |v| extract(v["_source"]) }
        }

        render json: response.to_json
    end

    def extract( hit )
        fields = ["caratula", "rit", "ruc", "proc", "f_lng", "forma_lnicio", "est_adm", "etapa", "estado_proc", "juez_asignado", "tribunal", "ubicacion", "inc_idx"]
        fields.map { |e| hit[e] }
    end

    def perform_elasticsearch( start, length, searchValue = '' )

        query = {
            :sort => [
                {
                    :inc_idx => "asc"
                }
            ],
            :query => {
                :terms => {
                    :crr_idcausa => SelectedCase.all.where(user_id: current_user.id).where(crr_idcausa_type: "cobranza").select("crr_idcausa").pluck(:crr_idcausa)
                }
            },
            :size => length,
            :from => start
        }

        baseUrl = "http://#{Rails.application.secrets.elasticsearch_host}:#{Rails.application.secrets.elasticsearch_port}"

        client = Elasticsearch::Client.new log: true, host: baseUrl

        client.cluster.health

        result = client.search index: 'cobranza', type: 'primal_data', body: query

    end
end
