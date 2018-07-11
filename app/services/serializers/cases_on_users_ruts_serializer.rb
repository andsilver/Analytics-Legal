class Serializers::CasesOnUsersRutsSerializer
  def initialize(user)
    @user = user
  end

  def to_json(limit:, offset:, draw:, columns:, order:)
    count = Laboral::Case.where(Id: whitelisted_litigators_ids).count
    data = cases(limit: limit, offset: offset, columns: columns, order: order).each_with_object([]) do |kase, memo|
      memo << [
        kase.RIT,
        kase.RUC,
        kase.Nombre,
        kase.Tribunal,
        kase.read_attribute('Fecha Ingreso'),
        kase.Procedimiento,
        kase.read_attribute('Forma Inicio'),
        kase.read_attribute('Estado Adm.'),
        kase.Etapa,
        kase.read_attribute('Estado Procedimiento')
      ]
    end

    {
      data: data,
      draw: draw,
      recordsTotal: count,
      recordsFiltered: count
    }
  end

  private

  def cases(limit:, offset:, columns:, order:)
    ordered = "`#{columns[order['0']['column']]['name']}` #{order['0']['dir']}"

    Laboral::Case
      .where(Id: whitelisted_litigators_ids)
      .limit(limit)
      .offset(offset)
      .order(ordered)
  end

  def whitelisted_litigators_ids
    Laboral::Litigant.where(Rut: @user.whitelisted_litigators.pluck(:rut)).pluck(:id)
  end
end
