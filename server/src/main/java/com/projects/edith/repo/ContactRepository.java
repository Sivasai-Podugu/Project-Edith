package com.projects.edith.repo;

import com.projects.edith.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Integer> {
    @Query(value = "SELECT " +
            "c.contactuserid AS contact_user_id, " +
            "u.name AS contact_name, " +
            "(SELECT m.message FROM Message m " +
            "WHERE (m.senderid = :userId AND m.receiverid = c.contactuserid) " +
            "OR (m.senderid = c.contactuserid AND m.receiverid = :userId) " +
            "ORDER BY m.timestamp DESC LIMIT 1) AS latest_message, " +
            "(SELECT m.timestamp FROM Message m " +
            "WHERE (m.senderid = :userId AND m.receiverid = c.contactuserid) " +
            "OR (m.senderid = c.contactuserid AND m.receiverid = :userId) " +
            "ORDER BY m.timestamp DESC LIMIT 1) AS latest_message_timestamp " +
            "FROM Contact c " +
            "INNER JOIN User u ON c.contactuserid = u.id " +
            "WHERE c.userid = :userId",
            nativeQuery = true)
    List<Map<String,Object>> findContactsAndLatestMessagesByUserId(@Param("userId") Integer userId);
    boolean existsByUseridAndContactuserid(Integer userid, Integer contactUserid);
}
